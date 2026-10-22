import { invoke } from "@tauri-apps/api/core"
import { open, save } from "@tauri-apps/plugin-dialog"

import {
  COURSE_FILE_EXTENSION,
  validateCoursePackage,
  type CoursePackage,
} from "./course-manifest"

/**
 * Serialize a course package to a .edu-course.json file via a Rust command.
 * The Rust side (`export_course`) writes the JSON so we don't need fs perms in JS.
 */
export async function exportCourse(pkg: CoursePackage): Promise<void> {
  const path = await save({
    defaultPath: `${pkg.meta.id}${COURSE_FILE_EXTENSION}`,
    filters: [{ name: "Edu course", extensions: ["json"] }],
  })
  if (!path) return
  await invoke("export_course", { payload: pkg, path })
}

/**
 * Pick a file and read+validate it. The Rust side (`import_course`) returns
 * the raw JSON string; validation happens in JS so the user gets field-level
 * errors from validateCoursePackage().
 */
export async function importCourse(): Promise<CoursePackage | null> {
  const selected = await open({
    multiple: false,
    filters: [{ name: "Edu course", extensions: ["json"] }],
  })
  if (!selected || Array.isArray(selected)) return null

  const json = await invoke<string>("import_course", { path: selected })
  const result = validateCoursePackage(JSON.parse(json))
  if (!result.ok) {
    throw new Error(`Invalid course package:\n${result.errors.join("\n")}`)
  }
  return result.value
}
