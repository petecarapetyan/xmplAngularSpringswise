import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserHistoryDetailComponent } from './user-history-detail.component';

describe('UserHistory Management Detail Component', () => {
  let comp: UserHistoryDetailComponent;
  let fixture: ComponentFixture<UserHistoryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserHistoryDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ userHistory: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(UserHistoryDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(UserHistoryDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load userHistory on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.userHistory).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
