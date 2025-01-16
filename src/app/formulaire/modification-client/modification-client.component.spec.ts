import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationClientComponent } from './modification-client.component';

describe('ModificationClientComponent', () => {
  let component: ModificationClientComponent;
  let fixture: ComponentFixture<ModificationClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificationClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificationClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
