---
description: Procedure to prevent strict design regression
---

# Design Regression Prevention Workflow

## 1. Scope Analysis
- Identify which design rules (01, 02, 03) are touched by the proposed change.
- **Example**: Changing a font size touches Rule #01 (Typography Systems).

## 2. Collision Check
- Does this override a global variable?
- Does this introduce a fixed pixel value where a fluid one existed?
- Does this add a 4th layer of depth (violating Rule #02)?

## 3. Pre-Commit Verification
- Run local build.
- Check console for any strict mode CSS warnings (if linting is active).
- Verify dark mode fallback manually (mental simulation if automated test missing).

## 4. Approval
- If valid -> Approve.
- If invalid -> Refactor to adhere to `.agent/rules/`.
