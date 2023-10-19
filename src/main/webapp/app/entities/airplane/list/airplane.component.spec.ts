import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AirplaneService } from '../service/airplane.service';

import { AirplaneComponent } from './airplane.component';

describe('Airplane Management Component', () => {
  let comp: AirplaneComponent;
  let fixture: ComponentFixture<AirplaneComponent>;
  let service: AirplaneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'airplane', component: AirplaneComponent }]), HttpClientTestingModule],
      declarations: [AirplaneComponent],
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
      .overrideTemplate(AirplaneComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AirplaneComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AirplaneService);

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
    expect(comp.airplanes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to airplaneService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getAirplaneIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getAirplaneIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
