CREATE TABLE "ingredients" (
	"pk" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ingredients_pk_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"id" uuid NOT NULL,
	"recipe_id" uuid NOT NULL,
	"name" varchar(120) NOT NULL,
	"measure" "VARCHAR(120) NOT NULL",
	"unit" varchar NOT NULL,
	CONSTRAINT "ingredients_id_unique" UNIQUE("id"),
	CONSTRAINT "name_length_check" CHECK (LENGTH("ingredients"."name") >= 3)
);
--> statement-breakpoint
CREATE TABLE "recipes" (
	"pk" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "recipes_pk_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"id" uuid NOT NULL,
	"author_id" uuid NOT NULL,
	"name" varchar(64) NOT NULL,
	"description" varchar(256) NOT NULL,
	"difficulty" varchar NOT NULL,
	"preparation_time" "INTEGER NOT NULL",
	CONSTRAINT "recipes_id_unique" UNIQUE("id"),
	CONSTRAINT "name_length_check" CHECK (LENGTH("recipes"."name") >= 3),
	CONSTRAINT "description_length_check" CHECK (LENGTH("recipes"."description") > 0),
	CONSTRAINT "preparation_time_min_value_check" CHECK ("recipes"."preparation_time" > 0)
);
--> statement-breakpoint
CREATE TABLE "steps" (
	"pk" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "steps_pk_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"id" uuid NOT NULL,
	"recipe_id" uuid NOT NULL,
	"order" integer NOT NULL,
	"description" varchar(120) NOT NULL,
	CONSTRAINT "steps_id_unique" UNIQUE("id"),
	CONSTRAINT "order_min_value_check" CHECK ("steps"."order" > 0),
	CONSTRAINT "description_length_check" CHECK (LENGTH("steps"."description") > 0)
);
--> statement-breakpoint
CREATE TABLE "tools" (
	"pk" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tools_pk_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"id" uuid NOT NULL,
	"recipe_id" uuid NOT NULL,
	"name" varchar(64) NOT NULL,
	"amount" integer NOT NULL,
	CONSTRAINT "tools_id_unique" UNIQUE("id"),
	CONSTRAINT "name_length_check" CHECK (LENGTH("tools"."name") >= 3),
	CONSTRAINT "amount_min_value_check" CHECK ("tools"."amount" > 0)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"pk" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_pk_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"id" uuid NOT NULL,
	"name" varchar(120) NOT NULL,
	"email" varchar(120) NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "name_length_check" CHECK (LENGTH("users"."name") >= 3),
	CONSTRAINT "password_length_check" CHECK (LENGTH("users"."password") >= 8)
);
--> statement-breakpoint
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "steps" ADD CONSTRAINT "steps_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tools" ADD CONSTRAINT "tools_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;