import {
  of,
  timer,
  Subject,
  merge
} from "rxjs";
import {
  exhaustMap,
  debounceTime,
  distinct,
  withLatestFrom,
  takeUntil,
  map
} from "rxjs/operators";

// some input event
const source = new Subject<string>();

const debounceObs = source.pipe(debounceTime(300));
const intervalObs = source.pipe(
  exhaustMap(x =>
    of(x).pipe(
      takeUntil(source2),
      exhaustMap(y => timer(1000))
    )
  )
);

const final = merge(debounceObs, intervalObs).pipe(
  withLatestFrom(source),
  map(([_, value]) => value),
  distinct()
);

// fetching resource
final.subscribe(x => console.log("final", x));
