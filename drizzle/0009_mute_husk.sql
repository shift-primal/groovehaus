ALTER TABLE "products" DROP COLUMN IF EXISTS "product_search";--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "product_search" "tsvector" GENERATED ALWAYS AS (
			to_tsvector('simple', f_unaccent(regexp_replace(
				coalesce("products"."name", '') || ' ' ||
				coalesce("products"."artist_name", '') || ' ' ||
				coalesce("products"."manufacturer", ''),
				'\$', 's', 'g'
			)))) STORED NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "rating" jsonb;