import { Observable, OperatorFunction } from 'rxjs';
import { operate } from 'rxjs/internal/util/lift';
import { noop } from 'rxjs/internal/util/noop';
import { OperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';
import { FamilyMemberBase } from '../../data';

export function customBuffer(
  closingNotifier: Observable<{
    index: number;
    instance: FamilyMemberBase;
  }>
): OperatorFunction<
  {
    index: number;
    instance: FamilyMemberBase;
  },
  FamilyMemberBase[]
> {
  return operate((source, subscriber) => {
    // The current buffered values.
    let currentBuffer: Record<string, FamilyMemberBase[]> = {};
    let currLastName: string = '';
    // Subscribe to our source.
    source.subscribe(
      new OperatorSubscriber(
        subscriber,
        (value) => {
          const family = currentBuffer[value.instance.lastName];
          if (!family) {
            currentBuffer[value.instance.lastName] = [];
          }
          currentBuffer[value.instance.lastName][value.index] = value.instance;
          currLastName = value.instance.lastName;
        },
        () => {
          subscriber.next(currentBuffer[currLastName]);
          subscriber.complete();
        }
      )
    );

    // Subscribe to the closing notifier.
    closingNotifier.subscribe(
      new OperatorSubscriber(
        subscriber,
        (member) => {
          // Start a new buffer and emit the previous one.
          const b = currentBuffer[member.instance.lastName];
          // find index of undefined element
          const foundIndex = b.findIndex((el) => el === undefined);
          const lastIndex = foundIndex === -1 ? b.length : foundIndex;
          // currentBuffer = [];
          subscriber.next(b.slice(0, lastIndex));
        },
        noop
      )
    );

    return () => {
      // Ensure buffered values are released on finalization.
      currentBuffer = null!;
    };
  });
}
