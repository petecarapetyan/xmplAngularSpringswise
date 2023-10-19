import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CodingCategoryService } from '../service/coding-category.service';

import { CodingCategoryComponent } from './coding-category.component';

describe('CodingCategory Management Component', () => {
  let comp: CodingCategoryComponent;
  let fixture: ComponentFixture<CodingCategoryComponent>;
  let service: CodingCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'coding-category', component: CodingCategoryComponent }]), HttpClientTestingModule],
      declarations: [CodingCategoryComponent],
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
      .overrideTemplate(CodingCategoryComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CodingCategoryComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CodingCategoryService);

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
    expect(comp.codingCategories?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to codingCategoryService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getCodingCategoryIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getCodingCategoryIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
