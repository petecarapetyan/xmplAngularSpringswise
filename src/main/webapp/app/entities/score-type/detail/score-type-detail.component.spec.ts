import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ScoreTypeDetailComponent } from './score-type-detail.component';

describe('ScoreType Management Detail Component', () => {
  let comp: ScoreTypeDetailComponent;
  let fixture: ComponentFixture<ScoreTypeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreTypeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ scoreType: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ScoreTypeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ScoreTypeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load scoreType on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.scoreType).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
