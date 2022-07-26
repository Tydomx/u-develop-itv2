-- DROPPING TABLES TO HELP WITH DEBUGGING with clean slate
DROP TABLE IF EXISTS votes;

DROP TABLE IF EXISTS candidates;

DROP TABLE IF EXISTS parties;

DROP TABLE IF EXISTS voters;

-- creating PARTIES table
CREATE TABLE parties(
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	description TEXT
);

-- creating CANDIDATES table
CREATE TABLE candidates(
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	party_id INTEGER,
	industry_connected BOOLEAN NOT NULL,
	CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE
	SET
		NULL
);

-- creating VOTERS table
CREATE TABLE voters(
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	email VARCHAR(50) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- creating VOTES table
CREATE TABLE votes (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	voter_id INTEGER NOT NULL,
	candidate_id INTEGER NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	-- prevent duplicate records (only allowed to vote once)
	CONSTRAINT uc_voter UNIQUE (voter_id),
	-- if relevant candidate/voter is removed
	-- on delete cascade = deletes entire row from table
	CONSTRAINT fk_voter FOREIGN KEY (voter_id) REFERENCES voters(id) ON DELETE CASCADE,
	CONSTRAINT fk_candidate FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);