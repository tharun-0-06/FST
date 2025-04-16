import { Pipe } from '@angular/core';
@Pipe({ name: 'censor' })
export class censorPipe {
    transform(input: string, replacement: string): string {
        var cWords = ["bad", "rotten", "terrible"];
        var out = input;
        for (var i = 0; i < cWords.length; i++) {
            out = out.replace(cWords[i], replacement);
        }
        return out
    }
}
export class AppComponent {
    title = 'my-app';
  }