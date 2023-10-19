import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { UserHistoryService } from '../service/user-history.service';

import { UserHistoryComponent } from './user-history.component';

describe('UserHistory Management Component', () => {
  let comp: UserHistoryComponent;
  let fixture: ComponentFixture<UserHistoryComponent>;
  let service: UserHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'user-history', component: UserHistoryComponent }]), HttpClientTestingModule],
      declarations: [UserHistoryComponent],
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
      .overrideTemplate(UserHistoryComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UserHistoryComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(UserHistoryService);

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
    expect(comp.userHistories?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to userHistoryService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getUserHistoryIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getUserHistoryIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
