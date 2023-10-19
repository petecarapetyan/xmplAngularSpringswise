import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ScoreService } from '../service/score.service';

import { ScoreComponent } from './score.component';

describe('Score Management Component', () => {
  let comp: ScoreComponent;
  let fixture: ComponentFixture<ScoreComponent>;
  let service: ScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'score', component: ScoreComponent }]), HttpClientTestingModule],
      declarations: [ScoreComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(ScoreComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ScoreComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ScoreService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.scores?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to scoreService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getScoreIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getScoreIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
