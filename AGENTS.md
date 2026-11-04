# Polymath agent guidance

Read `CLAUDE.md` for application architecture, development commands, and test
requirements. Both Codex and Claude Code must read `docs/INFRASTRUCTURE.md`
before infrastructure, deployment, or database work. It supersedes historical
provisioning plans in the PRD.

Operate from this machine; use the sibling `../infra-lr15a` checkout for shared
infrastructure access and its dated handoff. Changes to Polymath do not authorize
changes to shared PostgreSQL or other apps. Keep production secrets out of this
repository and tool output. Verify a recoverable database backup before updates.
