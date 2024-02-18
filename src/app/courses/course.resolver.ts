import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { CoursesHttpService } from "./services/courses-http.service";
import { Observable } from "rxjs";
import { Course } from "./model/course";
import { Injectable, inject } from "@angular/core";


@Injectable()
export class CourseResolverService {
    constructor(private courseHttpService: CoursesHttpService) {

    }

    loadCourses(): Observable<Course[]> {
        return this.courseHttpService.findAllCourses().pipe()
    }

}

export const courseResolver: ResolveFn = (route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> => {
    return inject(CourseResolverService).loadCourses();
}