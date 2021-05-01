import { database } from './../data/data.store';
import { IResolvers } from 'graphql-tools';
import _ from 'lodash';
import { measureMemory } from 'node:vm';

const mutation: IResolvers = {
    Mutation: {

        //Creating a new course for a array parameter "course"
        newCourse(__:void, {course} ): any{
            const newCourse = {
                id: String(database.courses.length + 1),
                title: course.title,
                description: course.description,
                clases: course.clases,
                time: course.time,
                level: course.level,
                logo: course.logo,
                path: course.path,
                teacher: course.teacher, 
                reviews: [],
            }
            if(database.courses.filter(itemCourse => itemCourse.title === newCourse.title).length === 0){
            database.courses.push(newCourse);
            return newCourse;
            }
            return {
                id: '-1',
                title: 'Ya existe un curso con este nombre',
                description: '',
                clases: -1,
                time: 0.0,
                level: 'ALL',
                logo: '',
                path: '',
                teacher: '', 
                reviews: [],
            }
        },

        //Updating an existing course, searching by and ID and change values to the  introduced parameter
        updateCourse(__:void, {course} ): any{
            const exist = _.findIndex(database.courses, function (o) {
                return o.id === course.id
            });

            if(exist > -1 ){
                const reviews = database.courses[exist].reviews;
                course.reviews = reviews;
                database.courses[exist] = course ;
                return course;
            }
            return messageCourse('No se puede actualizar este curso porque NO existe!')
        },
        deleteCourse(__: void, { id }):any {
            const deleteCourse = _.remove(database.courses, function(course){
                return course.id === id;
            });

            if(deleteCourse[0] === undefined){
                return messageCourse('No se puede eliminar este curso, No existe!');
            }
            return deleteCourse[0];
        }
    }
}

function messageCourse(message:string) {
    return {
        id: '-1',
        title: message,
        description: '',
        clases: -1,
        time: 0.0,
        level: 'ALL',
        logo: '',
        path: '',
        teacher: '', 
        reviews: [],
    }
}

export default mutation;