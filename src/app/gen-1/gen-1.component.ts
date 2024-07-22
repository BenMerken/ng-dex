import { AfterViewInit, Component, DestroyRef, inject } from '@angular/core';

@Component({
  selector: 'dex-gen-1',
  standalone: true,
  imports: [],
  templateUrl: './gen-1.component.html',
  styleUrl: './gen-1.component.scss'
})
export class Gen1Component implements AfterViewInit {
  private destroyRef = inject(DestroyRef)

  ngAfterViewInit(): void {
    document.querySelector('body')?.classList.add('gen-1')

    this.destroyRef.onDestroy(() => {
      document.querySelector('body')?.classList.remove('gen-1')
    })
  }
}
