from database import undo_move

success = undo_move(1)

if success:
    print("Undo successful")
else:
    print("Undo failed")
    