import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  onNavLinkClick(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    target.classList.add('clicked');
    setTimeout(() => {
      target.classList.remove('clicked');
    }, 100);
  }

}
