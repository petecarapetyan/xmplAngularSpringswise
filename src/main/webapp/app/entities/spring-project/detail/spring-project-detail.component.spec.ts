import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SpringProjectDetailComponent } from './spring-project-detail.component';

describe('SpringProject Management Detail Component', () => {
  let comp: SpringProjectDetailComponent;
  let fixture: ComponentFixture<SpringProjectDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpringProjectDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ springProject: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SpringProjectDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SpringProjectDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load springProject on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.springProject).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
