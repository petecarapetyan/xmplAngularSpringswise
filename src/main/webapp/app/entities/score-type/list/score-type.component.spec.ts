import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ScoreTypeService } from '../service/score-type.service';

import { ScoreTypeComponent } from './score-type.component';

describe('ScoreType Management Component', () => {
  let comp: ScoreTypeComponent;
  let fixture: ComponentFixture<ScoreTypeComponent>;
  let service: ScoreTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'score-type', component: ScoreTypeComponent }]), HttpClientTestingModule],
      declarations: [ScoreTypeComponent],
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
      .overrideTemplate(ScoreTypeComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ScoreTypeComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ScoreTypeService);

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
    expect(comp.scoreTypes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to scoreTypeService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getScoreTypeIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getScoreTypeIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
