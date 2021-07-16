/// <reference types="node" />
/// <reference types="jasmine" />
import type { EventEmitter } from 'events';
import type { ReporterOptions, TestEvent } from './types';
export default class JasmineReporter {
    private _reporter;
    startedSuite?: TestEvent;
    private _cid;
    private _specs;
    private _shouldCleanStack;
    private _parent;
    private _failedCount;
    private _suiteStart;
    private _testStart;
    constructor(_reporter: EventEmitter, params: ReporterOptions);
    suiteStarted(suite: jasmine.CustomReporterResult): void;
    specStarted(test: jasmine.CustomReporterResult): void;
    specDone(test: jasmine.CustomReporterResult): void;
    suiteDone(suite: jasmine.CustomReporterResult): void;
    emit(event: string, payload: TestEvent): void;
    getFailedCount(): number;
    getUniqueIdentifier(target: Pick<TestEvent, 'description' | 'id'>): string;
    cleanStack(error: jasmine.FailedExpectation): jasmine.FailedExpectation;
}
//# sourceMappingURL=reporter.d.ts.map