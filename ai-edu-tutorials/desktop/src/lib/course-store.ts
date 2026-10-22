import { LazyStore } from "@tauri-apps/plugin-store"

import type { CoursePackage } from "./course-manifest"

const STORE_FILE = "courses.json"
const KEY = "courses"

async function store() {
  return new LazyStore(STORE_FILE)
}

export async function listCourses(): Promise<CoursePackage[]> {
  try {
    const s = await store()
    const map = (await s.get<Record<string, CoursePackage>>(KEY)) ?? {}
    return Object.values(map)
  } catch {
    return []
  }
}

export async function saveCourse(pkg: CoursePackage): Promise<void> {
  const s = await store()
  const map = (await s.get<Record<string, CoursePackage>>(KEY)) ?? {}
  map[pkg.meta.id] = pkg
  await s.set(KEY, map)
  await s.save()
}

export async function deleteCourse(id: string): Promise<void> {
  const s = await store()
  const map = (await s.get<Record<string, CoursePackage>>(KEY)) ?? {}
  delete map[id]
  await s.set(KEY, map)
  await s.save()
}
