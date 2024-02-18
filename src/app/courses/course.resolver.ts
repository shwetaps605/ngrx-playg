import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { CoursesHttpService } from "./services/courses-http.service";
import { Observable } from "rxjs";
import { Course } from "./model/course";
import { Injectable, inject } from "@angular/core";
import { CourseEntityService } from "./services/course-entity-service";
import { filter, first, map, tap } from "rxjs/operators";


@Injectable({
    providedIn: "any"
})
export class CourseResolverService {

    constructor(private courseEntityService: CourseEntityService) {

    }

    //using map to convert Observable<Course[]> to Observable<boolean>
    // loadCourses(): Observable<boolean> {
    //     return this.courseEntityService.getAll().
    //     pipe(
    //         map(courses => !!courses)
    //     )
    // }

    resolve(): Observable<boolean> {
        return this.courseEntityService.loaded$
        .pipe(
            tap(loaded => {
                if(!loaded) {
                    this.courseEntityService.getAll()
                }
            }),
            filter(loaded => !!loaded),
            first()
        )
    }

}

export const courseResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<any> => {
    return inject(CourseResolverService).resolve();
}
