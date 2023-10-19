import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FrogService } from '../service/frog.service';

import { FrogComponent } from './frog.component';

describe('Frog Management Component', () => {
  let comp: FrogComponent;
  let fixture: ComponentFixture<FrogComponent>;
  let service: FrogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'frog', component: FrogComponent }]), HttpClientTestingModule],
      declarations: [FrogComponent],
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
      .overrideTemplate(FrogComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FrogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FrogService);

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
    expect(comp.frogs?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to frogService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getFrogIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getFrogIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
