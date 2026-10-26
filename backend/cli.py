"""SafeInGame Founder Management CLI.

Allows the platform founder to review contact submissions, update statuses,
and seed initial data safely from the command line without exposing
private contact data through any public API.
"""
import argparse
import sys
from app.database import SessionLocal, Base, engine
from app.models.contact import ContactSubmission
from app.models.category import Category
from app.api.v1.endpoints.categories import DEFAULT_CATEGORIES


def init_db():
    Base.metadata.create_all(bind=engine)


def list_submissions(status_filter: str = None, limit: int = 20):
    init_db()
    db = SessionLocal()
    try:
        query = db.query(ContactSubmission)
        if status_filter:
            query = query.filter(ContactSubmission.status == status_filter)
        items = query.order_by(ContactSubmission.created_at.desc()).limit(limit).all()

        print(f"\n=== Contact Submissions (Total showing: {len(items)}) ===")
        if not items:
            print("No submissions found.")
            return

        for item in items:
            date_str = item.created_at.strftime("%Y-%m-%d %H:%M:%S UTC") if item.created_at else "N/A"
            email_display = item.email if item.email else "[No email provided]"
            print(f"[{item.id}] [{item.status.upper()}] {date_str}")
            print(f"     Category: {item.category} | Subject: {item.subject}")
            print(f"     From: {email_display}")
            print(f"     Preview: {item.message[:80]}...")
            print("-" * 60)
    finally:
        db.close()


def view_submission(submission_id: int):
    init_db()
    db = SessionLocal()
    try:
        item = db.query(ContactSubmission).filter(ContactSubmission.id == submission_id).first()
        if not item:
            print(f"Error: Submission #{submission_id} not found.")
            sys.exit(1)

        date_str = item.created_at.strftime("%Y-%m-%d %H:%M:%S UTC") if item.created_at else "N/A"
        print(f"\n=== Submission #{item.id} Details ===")
        print(f"Date:       {date_str}")
        print(f"Status:     {item.status}")
        print(f"Category:   {item.category}")
        print(f"Subject:    {item.subject}")
        print(f"Reply Email:{item.email or '[None]'}")
        print(f"IP Hash:    {item.client_ip_hash or '[None]'}")
        print("\nMessage Body:")
        print(item.message)
        print("=" * 60)
    finally:
        db.close()


def update_status(submission_id: int, new_status: str):
    init_db()
    db = SessionLocal()
    try:
        item = db.query(ContactSubmission).filter(ContactSubmission.id == submission_id).first()
        if not item:
            print(f"Error: Submission #{submission_id} not found.")
            sys.exit(1)

        item.status = new_status
        db.commit()
        print(f"Submission #{submission_id} updated to status '{new_status}'.")
    finally:
        db.close()


def seed_categories():
    init_db()
    db = SessionLocal()
    try:
        existing = db.query(Category).count()
        if existing > 0:
            print(f"Database already contains {existing} categories. Skipping seed.")
            return

        for c in DEFAULT_CATEGORIES:
            cat = Category(
                id=c["id"],
                slug=c["slug"],
                title_en=c["title_en"],
                title_ru=c["title_ru"],
                description_en=c["description_en"],
                description_ru=c["description_ru"],
                icon=c["icon"],
                display_order=c["display_order"],
            )
            db.add(cat)

        db.commit()
        print(f"Successfully seeded {len(DEFAULT_CATEGORIES)} categories into database.")
    finally:
        db.close()


def main():
    parser = argparse.ArgumentParser(description="SafeInGame Founder Administration CLI")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # list
    list_p = subparsers.add_parser("list-submissions", help="List contact submissions")
    list_p.add_argument("--status", choices=["pending", "reviewed", "resolved"], help="Filter by status")
    list_p.add_argument("--limit", type=int, default=20, help="Maximum items to show")

    # view
    view_p = subparsers.add_parser("view-submission", help="View full submission details")
    view_p.add_argument("id", type=int, help="Submission ID")

    # update
    update_p = subparsers.add_parser("update-status", help="Update submission status")
    update_p.add_argument("id", type=int, help="Submission ID")
    update_p.add_argument("status", choices=["pending", "reviewed", "resolved"], help="New status")

    # seed
    subparsers.add_parser("seed-categories", help="Seed default categories into database")

    args = parser.parse_args()
    if args.command == "list-submissions":
        list_submissions(status_filter=args.status, limit=args.limit)
    elif args.command == "view-submission":
        view_submission(args.id)
    elif args.command == "update-status":
        update_status(args.id, args.status)
    elif args.command == "seed-categories":
        seed_categories()
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
