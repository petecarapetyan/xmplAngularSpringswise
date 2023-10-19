import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ScoreDetailComponent } from './score-detail.component';

describe('Score Management Detail Component', () => {
  let comp: ScoreDetailComponent;
  let fixture: ComponentFixture<ScoreDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ score: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ScoreDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ScoreDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load score on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.score).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
