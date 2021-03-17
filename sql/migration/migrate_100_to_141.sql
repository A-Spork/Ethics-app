-- Add to Concerns
ALTER TABLE Concerns ADD q15_1_value boolean default null;
ALTER TABLE Concerns ADD q15_1_explanation text default null;
ALTER TABLE Concerns ADD q15_2_value boolean default null;
ALTER TABLE Concerns ADD q15_2_explanation text default null;
ALTER TABLE Concerns ADD q15_3_value boolean default null;
ALTER TABLE Concerns ADD q15_3_explanation text default null;

-- Add to Comments

ALTER TABLE Comments ADD q15_1_comment text default null;
ALTER TABLE Comments ADD q15_2_comment text default null;
ALTER TABLE Comments ADD q15_3_comment text default null;
