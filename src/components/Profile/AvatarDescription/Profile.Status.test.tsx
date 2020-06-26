import React from "react"
import { create } from "react-test-renderer"
import ProfileStatus from "./ProfileStatus"

describe("ProfileStatus component", () => {
    test("status of props should be in state", () => {
        const component = create(<ProfileStatus updateStatus={() => {}} status="ButInProject" />);
        const instance = component.getInstance();
        // @ts-ignore
        expect(instance.state.status).toBe("ButInProject");
    });
    test("after creation span should be displayed", () => {
        const component = create(<ProfileStatus updateStatus={() => {}} status="ButInProject" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });
    test("after creation <input> should be not displayed", () => {
        const component = create(<ProfileStatus updateStatus={() => {}} status="ButInProject" />);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        } ).toThrow();
    });
    test("after creation span should be correct status", () => {
        const component = create(<ProfileStatus updateStatus={() => {}} status="ButInProject" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("ButInProject");
    });
    test("input should be displayed in editMode", () => {
        const component = create(<ProfileStatus updateStatus={() => {}} status="ButInProject" />);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("ButInProject");
    });
    test("callback should be called ", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="ButInProject" updateStatus={mockCallback} />);
        const instance = component.getInstance();
        // @ts-ignore
        instance.deActivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});