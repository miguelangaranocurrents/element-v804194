/*
Copyright 2026 Element Creations Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
*/

// @vitest-environment happy-dom

import { describe, it, expect } from "vitest";

import { setUpCommandTest } from "./__mocks__";

describe("/spoiler", () => {
    const roomId = "!room:example.com";

    it("wraps plain text in a spoiler span", async () => {
        const { client, command } = setUpCommandTest(roomId, "/spoiler");
        const result = await command.run(client, roomId, null, "the secret plan").promise;
        expect(result).toMatchObject({
            body: "the secret plan",
            formatted_body: "<span data-mx-spoiler>the secret plan</span>",
        });
    });

    it("renders markdown inside the spoiler", async () => {
        const { client, command } = setUpCommandTest(roomId, "/spoiler");
        const result = await command.run(client, roomId, null, "the **secret** plan").promise;
        expect(result).toMatchObject({
            body: "the **secret** plan",
            formatted_body: expect.stringContaining("<strong>secret</strong>"),
        });
        expect((result as { formatted_body: string }).formatted_body).toContain("data-mx-spoiler");
    });
});
