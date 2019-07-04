CREATE SCHEMA dbo
-- Table: dbo."IdentityUser"
CREATE TABLE dbo."IdentityUser"
(
  "UserName" character varying(256) NOT NULL,
  "Email" character varying(256) NOT NULL,
  "EmailConfirmed" boolean NOT NULL,
  "PasswordHash" text,
  "SecurityStamp" character varying(38),
  "PhoneNumber" character varying(50),
  "PhoneNumberConfirmed" boolean,
  "TwoFactorEnabled" boolean NOT NULL,
  "LockoutEnd" timestamp without time zone,
  "LockoutEnabled" boolean NOT NULL,
  "AccessFailedCount" integer NOT NULL,
  "Id" serial NOT NULL,
  CONSTRAINT "PK_IdentityUser" PRIMARY KEY ("Id")
)
WITH (
  OIDS=FALSE
);

-- Table: dbo."IdentityRole"

CREATE TABLE dbo."IdentityRole"
(
  "Id" serial NOT NULL,
  "Name" character varying(50) NOT NULL,
  CONSTRAINT "IdentityRole_pkey" PRIMARY KEY ("Id")
)
WITH (
  OIDS=FALSE
);

-- Table: dbo."IdentityLogin"

CREATE TABLE dbo."IdentityLogin"
(
  "LoginProvider" character varying(256) NOT NULL,
  "ProviderKey" character varying(128) NOT NULL,
  "UserId" integer NOT NULL,
  "Name" character varying(256) NOT NULL,
  CONSTRAINT "IdentityLogin_pkey" PRIMARY KEY ("LoginProvider", "ProviderKey", "UserId"),
  CONSTRAINT "IdentityLogin_UserId_fkey" FOREIGN KEY ("UserId")
      REFERENCES dbo."IdentityUser" ("Id") MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);

-- Table: dbo."IdentityUserClaim"

CREATE TABLE dbo."IdentityUserClaim"
(
  "Id" serial NOT NULL,
  "UserId" integer NOT NULL,
  "ClaimType" character varying(256) NOT NULL,
  "ClaimValue" character varying(256) NOT NULL,
  CONSTRAINT "IdentityUserClaim_pkey" PRIMARY KEY ("Id"),
  CONSTRAINT "IdentityUserClaim_UserId_fkey" FOREIGN KEY ("UserId")
      REFERENCES dbo."IdentityUser" ("Id") MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);

-- Table: dbo."IdentityUserRole"

CREATE TABLE dbo."IdentityUserRole"
(
  "UserId" integer NOT NULL,
  "RoleId" integer NOT NULL,
  CONSTRAINT "IdentityUserRole_pkey" PRIMARY KEY ("UserId", "RoleId"),
  CONSTRAINT "IdentityUserRole_RoleId_fkey" FOREIGN KEY ("RoleId")
      REFERENCES dbo."IdentityRole" ("Id") MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT "IdentityUserRole_UserId_fkey" FOREIGN KEY ("UserId")
      REFERENCES dbo."IdentityUser" ("Id") MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE
)
WITH (
  OIDS=FALSE
);

CREATE TABLE dbo."IdentityRoleClaim"
(
  "Id" serial NOT NULL,
  "RoleId" integer NOT NULL,
  "ClaimType" character varying(256) NOT NULL,
  "ClaimValue" character varying(256),
  CONSTRAINT "IdentityRoleClaim_pkey" PRIMARY KEY ("Id"),
  CONSTRAINT "IdentityRoleClaim_RoleId_fkey" FOREIGN KEY ("RoleId")
      REFERENCES dbo."IdentityRole" ("Id") MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);

------INSERT DUMMY DATA---------


insert into dbo."IdentityRole" values ('0', 'admin');
insert into dbo."IdentityRole" values ('1', 'contentmanager');
insert into dbo."IdentityRole" values ('2', 'user');

INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user1@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user2@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user3@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user4@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user5@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user6@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user7@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user8@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user9@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user10@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user11@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user11@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user12@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user13@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user14@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user15@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user16@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user17@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);
INSERT INTO dbo."IdentityUser" ("UserName", "Email", "EmailConfirmed", "SecurityStamp", "TwoFactorEnabled", "AccessFailedCount", "LockoutEnabled") VALUES ('user18@winfadd', 'user1@winfadd', true, 'fd945da1-207d-440c-860b-f424532fd13e', false, 0, false);