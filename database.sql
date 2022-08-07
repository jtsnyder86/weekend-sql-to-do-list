CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (200) NOT NULL,
	"status" BOOLEAN
	);
	
INSERT INTO "todo"
	("task", "status")
VALUES
	('Take the dogs for a walk', true),
	('Take the dogs for another walk', false),
	('Run the dishwasher', false),
	('Vacuum the house', true);