import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetsPlayersComponent } from './targets-players.component';

describe('TargetsPlayersComponent', () => {
  let component: TargetsPlayersComponent;
  let fixture: ComponentFixture<TargetsPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetsPlayersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TargetsPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
