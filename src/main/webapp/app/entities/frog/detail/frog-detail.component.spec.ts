import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FrogDetailComponent } from './frog-detail.component';

describe('Frog Management Detail Component', () => {
  let comp: FrogDetailComponent;
  let fixture: ComponentFixture<FrogDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrogDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ frog: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(FrogDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FrogDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load frog on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.frog).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
