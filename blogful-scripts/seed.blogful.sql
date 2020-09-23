BEGIN;

INSERT INTO blogful_articles (title, date_published, content )
VALUES
    ('Fish tricks',now() - '21 days'::INTERVAL, 'something-content'),
    ('Fish Apples',now() - '19 days'::INTERVAL, 'something-content Fish Apples'),
    ('Fish Orange',now() - '18 days'::INTERVAL, 'something-content Fish Orange'),
    ('Fish Mango',now() - '17 days'::INTERVAL, 'something-content Fish Mango'),
    ('Fish Pie',now() - '16 days'::INTERVAL, 'something-content Fish Pie'),
    ('Fish Seltzer',now() - '15 days'::INTERVAL, 'something-content Fish Seltzer'),
    ('Fish Crab',now() - '14 days'::INTERVAL, 'something-content Fish Crab'),
    ('Fish Wask',now() - '13 days'::INTERVAL, 'something-content Fish Wash'),
    ('Fish vicious',now() - '12 days'::INTERVAL, 'something-content Fish Vicious'),
    ('Fish Food',now() - '20 days'::INTERVAL, 'something-content fish food');

COMMIT;
