import { TestScheduler } from "@jest/core";
import { pushToHistory } from "../scripts/router";

/**
 * @jest-environment jsdom
 */
describe('pushToHistory', ()=>{
    test('settings', ()=>{
        expect(pushToHistory('settings').state.page).toBe('settings'); 
    });

    test('entry', ()=>{
        expect(pushToHistory('entry', 5).state.page).toBe('entry5');
    });

    test('default', ()=>{
        expect(pushToHistory().state.page).toBe();
    });
});
