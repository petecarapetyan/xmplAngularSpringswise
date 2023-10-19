import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { SpringProjectService } from '../service/spring-project.service';

import { SpringProjectComponent } from './spring-project.component';

describe('SpringProject Management Component', () => {
  let comp: SpringProjectComponent;
  let fixture: ComponentFixture<SpringProjectComponent>;
  let service: SpringProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'spring-project', component: SpringProjectComponent }]), HttpClientTestingModule],
      declarations: [SpringProjectComponent],
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
      .overrideTemplate(SpringProjectComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SpringProjectComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SpringProjectService);

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
    expect(comp.springProjects?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to springProjectService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getSpringProjectIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getSpringProjectIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
