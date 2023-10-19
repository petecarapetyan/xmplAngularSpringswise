import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TruckService } from '../service/truck.service';

import { TruckComponent } from './truck.component';

describe('Truck Management Component', () => {
  let comp: TruckComponent;
  let fixture: ComponentFixture<TruckComponent>;
  let service: TruckService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'truck', component: TruckComponent }]), HttpClientTestingModule],
      declarations: [TruckComponent],
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
      .overrideTemplate(TruckComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TruckComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TruckService);

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
    expect(comp.trucks?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to truckService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getTruckIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getTruckIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
