# Graph Report - mospi_knowledge  (2026-08-25)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 13 nodes · 7 edges · 7 communities (1 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 179 input · 69 output

## Graph Freshness
- Built from commit: `eff0c997`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Survey Design and Sampling
- National Accounts and GDP
- Statistical Proficiency Standards
- Statistical Programming
- Behavioral and Managerial Skills
- Digital Governance
- Technical Domain Knowledge

## God Nodes (most connected - your core abstractions)
1. `Survey Design & Sampling` - 4 edges
2. `Statistical Domain` - 2 edges
3. `Survey Design Principles (iGOT)` - 1 edges
4. `Planning and Designing of Large Scale Sample Surveys (NSSTA)` - 1 edges
5. `Junior Statistical Officer (JSO)` - 1 edges
6. `National Accounts & GDP` - 1 edges
7. `Director (ISS)` - 1 edges
8. `Proficiency Level Descriptors` - 1 edges
9. `Python Training for Statisticians (NSSTA)` - 1 edges
10. `Python & R Programming` - 1 edges

## Surprising Connections (you probably didn't know these)
- `Survey Design Principles (iGOT)` --references--> `Survey Design & Sampling`  [EXTRACTED]
  igotCourses.md → competencyFramework.md
- `Planning and Designing of Large Scale Sample Surveys (NSSTA)` --references--> `Survey Design & Sampling`  [EXTRACTED]
  nsstaCourses.md → competencyFramework.md
- `Junior Statistical Officer (JSO)` --references--> `Survey Design & Sampling`  [EXTRACTED]
  roleProfiles.md → competencyFramework.md
- `Director (ISS)` --references--> `National Accounts & GDP`  [EXTRACTED]
  roleProfiles.md → competencyFramework.md
- `Python Training for Statisticians (NSSTA)` --references--> `Python & R Programming`  [EXTRACTED]
  nsstaCourses.md → competencyFramework.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **FRAC Level Alignment** — competencyframework_proficiency_descriptors, roleprofiles_jso, roleprofiles_iss_director [EXTRACTED 0.95]
- **Survey Design Competency Ecosystem** — competencyframework_survey_design, igotcourses_igot_ill_survey_01, nsstacourses_nssta_survey_planning_design, roleprofiles_jso [INFERRED 0.90]

## Communities (7 total, 6 thin omitted)

### Community 0 - "Survey Design and Sampling"
Cohesion: 0.50
Nodes (4): Survey Design & Sampling, Survey Design Principles (iGOT), Planning and Designing of Large Scale Sample Surveys (NSSTA), Junior Statistical Officer (JSO)

## Knowledge Gaps
- **10 isolated node(s):** `Survey Design Principles (iGOT)`, `Planning and Designing of Large Scale Sample Surveys (NSSTA)`, `Junior Statistical Officer (JSO)`, `National Accounts & GDP`, `Director (ISS)` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Survey Design & Sampling` connect `Survey Design and Sampling` to `Statistical Proficiency Standards`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **Why does `Statistical Domain` connect `Statistical Proficiency Standards` to `Survey Design and Sampling`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `Survey Design Principles (iGOT)`, `Planning and Designing of Large Scale Sample Surveys (NSSTA)`, `Junior Statistical Officer (JSO)` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._