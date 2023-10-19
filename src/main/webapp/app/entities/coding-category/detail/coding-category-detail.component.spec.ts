import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CodingCategoryDetailComponent } from './coding-category-detail.component';

describe('CodingCategory Management Detail Component', () => {
  let comp: CodingCategoryDetailComponent;
  let fixture: ComponentFixture<CodingCategoryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodingCategoryDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ codingCategory: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CodingCategoryDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CodingCategoryDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load codingCategory on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.codingCategory).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
