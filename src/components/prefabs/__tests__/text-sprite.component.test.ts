import { TextSpriteMutable } from "../../../types";
import { textSprite } from "../text-sprite.component";

jest.mock("pixi.js", () => {
  const originalModule = jest.requireActual("pixi.js");

  return {
    ...originalModule,
    Assets: {
      load: (args) => mockAssetsLoad(args),
    },
  };
});

const mockAssetsLoad = jest.fn(async (args) => ({
  id: args,
  textures: {
    a: {},
    b: {},
    c: {},
  },
}));

describe("components", () => {
  describe("core", () => {
    describe("text-sprite", () => {
      beforeEach(() => {
        mockAssetsLoad.mockClear();
      });

      let $textSprite: TextSpriteMutable;

      beforeAll(async () => {
        $textSprite = await textSprite({
          text: "abc",
          color: 0xff00ff,
          spriteSheet: "font.json",
          alpha: 0.3,
          label: "something",
        });
      });

      test("getProps() returns initial custom and core props", async () => {
        expect($textSprite.getProps()).toEqual({
          color: 0xff00ff,
          spriteSheet: "font.json",
          text: "abc",
          alpha: 0.3,
          label: "something",
        });
      });

      test("setColor() sets color to displayObject", async () => {
        expect($textSprite.getColor()).toEqual(0xff00ff);
        expect(
          $textSprite.getDisplayObject({ __preventWarning: true }).children[1]
            .tint,
        ).toEqual(0xff00ff);

        await $textSprite.setColor(0x00ff00);
        expect($textSprite.getColor()).toEqual(0x00ff00);
        expect(
          $textSprite.getDisplayObject({ __preventWarning: true }).children[1]
            .tint,
        ).toEqual(0x00ff00);
      });

      test("setBackgroundColor() sets color to displayObject", async () => {
        expect($textSprite.getBackgroundColor()).toEqual(0xffffff);
        expect(
          $textSprite.getDisplayObject({ __preventWarning: true }).children[0]
            .tint,
        ).toEqual(0xffffff);

        await $textSprite.setBackgroundColor(0x00ff00);
        expect($textSprite.getBackgroundColor()).toEqual(0x00ff00);
        expect(
          $textSprite.getDisplayObject({ __preventWarning: true }).children[0]
            .tint,
        ).toEqual(0x00ff00);
      });

      test("setBackgroundAlpha() sets alpha to displayObject", async () => {
        expect($textSprite.getBackgroundAlpha()).toEqual(0);
        expect(
          $textSprite.getDisplayObject({ __preventWarning: true }).children[0]
            .alpha,
        ).toEqual(0);

        await $textSprite.setBackgroundAlpha(0.5);
        expect($textSprite.getBackgroundAlpha()).toEqual(0.5);
        expect(
          $textSprite.getDisplayObject({ __preventWarning: true }).children[0]
            .alpha,
        ).toEqual(0.5);
      });

      test("setBackgroundPadding() sets padding", async () => {
        expect($textSprite.getBackgroundPadding()).toEqual([0, 0, 0, 0]);

        await $textSprite.setBackgroundPadding([0, 1, 2, 3]);
        expect($textSprite.getBackgroundPadding()).toEqual([0, 1, 2, 3]);
      });

      test("to contain same children length on text", async () => {
        expect(
          $textSprite.getDisplayObject({ __preventWarning: true }).children[1]
            .children.length,
        ).toEqual(3);

        await $textSprite.setText("123 aabcfgbh");
        expect(
          $textSprite.getDisplayObject({ __preventWarning: true }).children[1]
            .children.length,
        ).toEqual(5);

        await $textSprite.setText("abcabc");
        expect(
          $textSprite.getDisplayObject({ __preventWarning: true }).children[1]
            .children.length,
        ).toEqual(6);
      });
    });
  });
});
