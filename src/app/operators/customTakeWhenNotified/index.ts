import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { operate } from 'rxjs/internal/util/lift';
import { noop } from 'rxjs/internal/util/noop';
import { OperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';

export function takeWhenNotified<T>(
  notifier: Observable<any>,
  autoNotifyFirst = false
): MonoTypeOperatorFunction<T> {
  return operate((source, subscriber) => {
    let queuedNotification = autoNotifyFirst;
    let buffer: T[] = [];
    source.subscribe(
      new OperatorSubscriber(
        subscriber,
        (value) => {
          if (!queuedNotification) {
            buffer.push(value);
          } else {
            queuedNotification = false;
            subscriber.next(value);
          }
        },
        noop
      )
    );
    notifier.subscribe(
      new OperatorSubscriber(subscriber, () => {
        if (buffer.length) {
          subscriber.next(buffer.splice(0, 1)[0]);
        } else {
          queuedNotification = true;
        }
      })
    );
  });
}
