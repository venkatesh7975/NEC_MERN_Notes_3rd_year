# Transaction fixture

Use a fresh disposable database, separate from the basic example's schema. Run setup.sql first, then transactions.sql once in the same selected database. Expected: one enrollment, course 12 enrolled_count = 1, and one activity log. The setup is intentionally not repeatable over populated tables; use a fresh sandbox for each run.

The second execution fails on the enrollment primary key. In a real application, catch errors and explicitly ROLLBACK; a failed SQL statement does not guarantee that the client stops executing the remaining script. Use your client's stop-on-error behavior for the demonstration and do not run with an option that continues after errors. This is a transaction teaching example, not a production enrollment service.
