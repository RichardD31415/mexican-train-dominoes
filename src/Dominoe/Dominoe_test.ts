import { assertEquals } from "@std/assert";
import Dominoe from "./Dominoe.ts";

Deno.test("Dominoe Can Be Created", () => {
  const dominoe = new Dominoe(3, 5);
  assertEquals(dominoe.faceA, 3);
  assertEquals(dominoe.faceB, 5);
  assertEquals(dominoe.isDouble, false);
});

Deno.test("Dominoe Can Be Double", () => {
  const dominoe = new Dominoe(4, 4);
  assertEquals(dominoe.isDouble, true);
});

Deno.test("Dominoe Can Be Created Without Arguments", () => {
  const dominoe = new Dominoe();
  assertEquals(typeof dominoe.faceA, "number");
  assertEquals(typeof dominoe.faceB, "number");
});

Deno.test("Dominoe toString Method Displays Correctly", () => {
  const dominoe = new Dominoe(2, 3);
  assertEquals(dominoe.toString(), "Dominoe(2, 3)");
});

Deno.test("Dominoe hasFace Method Works Correctly", () => {
  const dominoe = new Dominoe(1, 5);
  assertEquals(dominoe.hasFace(1), true);
  assertEquals(dominoe.hasFace(5), true);
  assertEquals(dominoe.hasFace(3), false);
});

Deno.test("Dominoe sharesFaceWith Method Works Correctly", () => {
  const dominoe1 = new Dominoe(2, 4);
  const dominoe2 = new Dominoe(4, 6);
  const dominoe3 = new Dominoe(1, 3);

  assertEquals(dominoe1.sharesFaceWith(dominoe2), true);
  assertEquals(dominoe1.sharesFaceWith(dominoe3), false);
  assertEquals(dominoe2.sharesFaceWith(dominoe1), true);
  assertEquals(dominoe2.sharesFaceWith(dominoe3), false);
  assertEquals(dominoe3.sharesFaceWith(dominoe1), false);
  assertEquals(dominoe3.sharesFaceWith(dominoe2), false);
});

Deno.test("Dominoe connectToFront Method Works Correctly", () => {
  const dominoe1 = new Dominoe(1, 2);
  const dominoe2 = new Dominoe(2, 3);

  dominoe1.connectToFront(dominoe2);
  assertEquals(dominoe1.connectingDominoeFront, dominoe2);
  assertEquals(dominoe2.connectingDominoeBack, dominoe1);
});

Deno.test("Dominoe connectToBack Method Works Correctly", () => {
  const dominoe1 = new Dominoe(1, 2);
  const dominoe2 = new Dominoe(2, 3);

  dominoe1.connectToBack(dominoe2);
  assertEquals(dominoe1.connectingDominoeBack, dominoe2);
  assertEquals(dominoe2.connectingDominoeFront, dominoe1);
});

Deno.test("Dominoe isConnectedTo Method Works Correctly", () => {
  const dominoe1 = new Dominoe(1, 2);
  const dominoe2 = new Dominoe(2, 3);
  const dominoe3 = new Dominoe(3, 4);

  dominoe1.connectToFront(dominoe2);

  assertEquals(dominoe1.isConnectedTo(dominoe2), true);
  assertEquals(dominoe2.isConnectedTo(dominoe1), true);
  assertEquals(dominoe1.isConnectedTo(dominoe3), false);
  assertEquals(dominoe2.isConnectedTo(dominoe3), false);
});

Deno.test("Dominoe Cant Connect to Itself", () => {
  const dominoe = new Dominoe(3, 5);

  try {
    dominoe.connectToFront(dominoe);
  } catch (error) {
    assertEquals(error instanceof Error, true);
    if (error instanceof Error) {
      assertEquals(error.message, "Cannot connect a dominoe to itself.");
    }
  }
});

Deno.test("Dominoe disconnectFromFront Method Works Correctly", () => {
  const dominoe1 = new Dominoe(1, 2);
  const dominoe2 = new Dominoe(2, 3);

  dominoe1.connectToFront(dominoe2);

  assertEquals(dominoe1.connectingDominoeFront, dominoe2);
  assertEquals(dominoe2.connectingDominoeBack, dominoe1);

  dominoe1.disconnectFromFront();

  assertEquals(dominoe1.connectingDominoeFront, undefined);
  assertEquals(dominoe2.connectingDominoeBack, undefined);
});

Deno.test("Dominoe disconnectFromBack Method Works Correctly", () => {
  const dominoe1 = new Dominoe(1, 2);
  const dominoe2 = new Dominoe(2, 3);

  dominoe1.connectToBack(dominoe2);

  assertEquals(dominoe1.connectingDominoeBack, dominoe2);
  assertEquals(dominoe2.connectingDominoeFront, dominoe1);

  dominoe1.disconnectFromBack();

  assertEquals(dominoe1.connectingDominoeBack, undefined);
  assertEquals(dominoe2.connectingDominoeFront, undefined);
});

Deno.test("Dominoe resetConnections Method Works Correctly", () => {
  const dominoe1 = new Dominoe(1, 2);
  const dominoe2 = new Dominoe(2, 3);

  dominoe1.connectToFront(dominoe2);
  assertEquals(dominoe1.connectingDominoeFront, dominoe2);
  assertEquals(dominoe2.connectingDominoeBack, dominoe1);

  dominoe1.resetConnections();
  assertEquals(dominoe1.connectingDominoeFront, undefined);
  assertEquals(dominoe2.connectingDominoeBack, undefined);
});

Deno.test("Dominoe clone Method Works Correctly", () => {
  const original = new Dominoe(3, 5);
  const clone = original.clone();

  assertEquals(clone.faceA, original.faceA);
  assertEquals(clone.faceB, original.faceB);
  assertEquals(clone.isDouble, original.isDouble);
  assertEquals(clone.toString(), original.toString());
});

Deno.test("Dominoe clone Method Creates Independent Instance", () => {
  const original = new Dominoe(3, 5);
  const clone = original.clone();

  clone.faceA = 6; // Change the clone's faceA

  assertEquals(original.faceA, 3); // Original should remain unchanged
  assertEquals(clone.faceA, 6); // Clone should reflect the change
});

Deno.test("Dominoe equals Method Works Correctly", () => {
  const dominoe1 = new Dominoe(2, 3);
  const dominoe2 = new Dominoe(2, 3);
  const dominoe3 = new Dominoe(3, 2);
  const dominoe4 = new Dominoe(4, 5);

  assertEquals(dominoe1.equals(dominoe2), true);
  assertEquals(dominoe1.equals(dominoe3), true); // Order should not matter
  assertEquals(dominoe1.equals(dominoe4), false);
});

Deno.test("Dominoe Constructor Validates Face Values", () => {
  try {
    new Dominoe(-1, 5);
  } catch (error) {
    assertEquals(error instanceof Error, true);
    if (error instanceof Error) {
      assertEquals(error.message, "Face A must be between 0 and 12.");
    }
  }

  try {
    new Dominoe(3, 13);
  } catch (error) {
    assertEquals(error instanceof Error, true);
    if (error instanceof Error) {
      assertEquals(error.message, "Face B must be between 0 and 12.");
    }
  }
});

Deno.test("Dominoe isHead Method Works Correctly", () => {
  const dominoe1 = new Dominoe(1, 2);
  const dominoe2 = new Dominoe(2, 3);

  assertEquals(dominoe1.isHead(), true);
  assertEquals(dominoe2.isHead(), true);

  dominoe1.connectToFront(dominoe2);

  assertEquals(dominoe1.isHead(), false);
  assertEquals(dominoe2.isHead(), true);
});

Deno.test("Dominoe isTail Method Works Correctly", () => {
  const dominoe1 = new Dominoe(1, 2);
  const dominoe2 = new Dominoe(2, 3);

  assertEquals(dominoe1.isTail(), true);
  assertEquals(dominoe2.isTail(), true);

  dominoe1.connectToBack(dominoe2);

  assertEquals(dominoe1.isTail(), false);
  assertEquals(dominoe2.isTail(), true);
});

Deno.test(
  "Dominoe Cannot ConnectToFront Another Dominoe That Already Has A Different Dominoe In The Connecting Position",
  () => {
    const dominoe1 = new Dominoe(1, 5);
    const dominoe2 = new Dominoe(2, 5);
    const dominoe3 = new Dominoe(3, 5);

    dominoe1.connectToFront(dominoe2);
    assertEquals(dominoe1.connectingDominoeFront, dominoe2);
    assertEquals(dominoe2.connectingDominoeBack, dominoe1);

    try {
      dominoe3.connectToFront(dominoe2);
    } catch (error) {
      assertEquals(error instanceof Error, true);
      if (error instanceof Error) {
        assertEquals(
          error.message,
          "The target dominoe is already connected to another dominoe in its back spot."
        );
      }
    }
    assertEquals(dominoe3.connectingDominoeFront, undefined);
    assertEquals(dominoe2.connectingDominoeBack, dominoe1);
  }
);

Deno.test(
  "Dominoe Cannot ConnectToBack Another Dominoe That Already Has A Different Dominoe In The Connecting Position",
  () => {
    const dominoe1 = new Dominoe(1, 5);
    const dominoe2 = new Dominoe(2, 5);
    const dominoe3 = new Dominoe(3, 5);

    dominoe1.connectToBack(dominoe2);
    assertEquals(dominoe1.connectingDominoeBack, dominoe2);
    assertEquals(dominoe2.connectingDominoeFront, dominoe1);

    try {
      dominoe3.connectToBack(dominoe2);
    } catch (error) {
      assertEquals(error instanceof Error, true);
      if (error instanceof Error) {
        assertEquals(
          error.message,
          "The target dominoe is already connected to another dominoe in its front spot."
        );
      }
    }
    assertEquals(dominoe3.connectingDominoeBack, undefined);
    assertEquals(dominoe2.connectingDominoeFront, dominoe1);
  }
);

Deno.test(
  "Dominoe Cannot ConnectToFront To A Different Dominoe Without First Disconnecting",
  () => {
    const dominoe1 = new Dominoe(1, 5);
    const dominoe2 = new Dominoe(2, 5);
    const dominoe3 = new Dominoe(3, 5);

    dominoe1.connectToFront(dominoe2);
    assertEquals(dominoe1.connectingDominoeFront, dominoe2);
    assertEquals(dominoe2.connectingDominoeBack, dominoe1);

    try {
      dominoe1.connectToFront(dominoe3);
    } catch (error) {
      assertEquals(error instanceof Error, true);
      if (error instanceof Error) {
        assertEquals(
          error.message,
          "This dominoe's front is already connected to another dominoe."
        );
      }
    }
    assertEquals(dominoe1.connectingDominoeFront, dominoe2);
  }
);

Deno.test(
  "Dominoe Cannot ConnectToBack To A Different Dominoe Without First Disconnecting",
  () => {
    const dominoe1 = new Dominoe(1, 5);
    const dominoe2 = new Dominoe(2, 5);
    const dominoe3 = new Dominoe(3, 5);

    dominoe1.connectToBack(dominoe2);
    assertEquals(dominoe1.connectingDominoeBack, dominoe2);
    assertEquals(dominoe2.connectingDominoeFront, dominoe1);

    try {
      dominoe1.connectToBack(dominoe3);
    } catch (error) {
      assertEquals(error instanceof Error, true);
      if (error instanceof Error) {
        assertEquals(
          error.message,
          "This dominoe's back is already connected to another dominoe."
        );
      }
    }
    assertEquals(dominoe1.connectingDominoeBack, dominoe2);
  }
);

Deno.test(
  "Dominoe Cannot ConnectToFront To A Dominoe That Does Not Share A Face",
  () => {
    const dominoe1 = new Dominoe(1, 5);
    const dominoe2 = new Dominoe(2, 6);

    try {
      dominoe1.connectToFront(dominoe2);
    } catch (error) {
      assertEquals(error instanceof Error, true);
      if (error instanceof Error) {
        assertEquals(
          error.message,
          "Cannot connect to a dominoe that does not share a face with this dominoe."
        );
      }
    }
    assertEquals(dominoe1.connectingDominoeFront, undefined);
  }
);

Deno.test(
  "Dominoe Cannot ConnectToBack To A Dominoe That Does Not Share A Face",
  () => {
    const dominoe1 = new Dominoe(1, 5);
    const dominoe2 = new Dominoe(2, 6);

    try {
      dominoe1.connectToBack(dominoe2);
    } catch (error) {
      assertEquals(error instanceof Error, true);
      if (error instanceof Error) {
        assertEquals(
          error.message,
          "Cannot connect to a dominoe that does not share a face with this dominoe."
        );
      }
    }
    assertEquals(dominoe1.connectingDominoeBack, undefined);
  }
);
