import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AirplaneDetailComponent } from './airplane-detail.component';

describe('Airplane Management Detail Component', () => {
  let comp: AirplaneDetailComponent;
  let fixture: ComponentFixture<AirplaneDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AirplaneDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ airplane: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AirplaneDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AirplaneDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load airplane on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.airplane).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
