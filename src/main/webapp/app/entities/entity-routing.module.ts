import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'student',
        data: { pageTitle: 'xmplAngularSpringswiseApp.student.home.title' },
        loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
      },
      {
        path: 'airplane',
        data: { pageTitle: 'xmplAngularSpringswiseApp.airplane.home.title' },
        loadChildren: () => import('./airplane/airplane.module').then(m => m.AirplaneModule),
      },
      {
        path: 'car',
        data: { pageTitle: 'xmplAngularSpringswiseApp.car.home.title' },
        loadChildren: () => import('./car/car.module').then(m => m.CarModule),
      },
      {
        path: 'truck',
        data: { pageTitle: 'xmplAngularSpringswiseApp.truck.home.title' },
        loadChildren: () => import('./truck/truck.module').then(m => m.TruckModule),
      },
      {
        path: 'coding-category',
        data: { pageTitle: 'xmplAngularSpringswiseApp.codingCategory.home.title' },
        loadChildren: () => import('./coding-category/coding-category.module').then(m => m.CodingCategoryModule),
      },
      {
        path: 'dog',
        data: { pageTitle: 'xmplAngularSpringswiseApp.dog.home.title' },
        loadChildren: () => import('./dog/dog.module').then(m => m.DogModule),
      },
      {
        path: 'frog',
        data: { pageTitle: 'xmplAngularSpringswiseApp.frog.home.title' },
        loadChildren: () => import('./frog/frog.module').then(m => m.FrogModule),
      },
      {
        path: 'movie',
        data: { pageTitle: 'xmplAngularSpringswiseApp.movie.home.title' },
        loadChildren: () => import('./movie/movie.module').then(m => m.MovieModule),
      },
      {
        path: 'spring-project',
        data: { pageTitle: 'xmplAngularSpringswiseApp.springProject.home.title' },
        loadChildren: () => import('./spring-project/spring-project.module').then(m => m.SpringProjectModule),
      },
      {
        path: 'user-history',
        data: { pageTitle: 'xmplAngularSpringswiseApp.userHistory.home.title' },
        loadChildren: () => import('./user-history/user-history.module').then(m => m.UserHistoryModule),
      },
      {
        path: 'ticket',
        data: { pageTitle: 'xmplAngularSpringswiseApp.ticket.home.title' },
        loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule),
      },
      {
        path: 'score-type',
        data: { pageTitle: 'xmplAngularSpringswiseApp.scoreType.home.title' },
        loadChildren: () => import('./score-type/score-type.module').then(m => m.ScoreTypeModule),
      },
      {
        path: 'score',
        data: { pageTitle: 'xmplAngularSpringswiseApp.score.home.title' },
        loadChildren: () => import('./score/score.module').then(m => m.ScoreModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
