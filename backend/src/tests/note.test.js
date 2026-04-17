import { describe, it, expect, vi, beforeEach } from "vitest";
import * as noteController from "../controllers/notesController.js";
import Note from "../models/Note.js";

// 🔥 MOCK mongoose model
vi.mock("../models/Note.js");

describe("Notes Controller", () => {
  
  let req, res;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    };

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

  // ✅ GET ALL NOTES
  it("should return all notes", async () => {
    const mockNotes = [{ title: "Test", content: "Hello" }];

    Note.find.mockReturnValue({
      sort: vi.fn().mockResolvedValue(mockNotes),
    });

    await noteController.getAllNotes(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockNotes);
  });

  // ✅ GET NOTE BY ID (success)
  it("should return a note by id", async () => {
    const mockNote = { _id: "1", title: "Test" };

    req.params.id = "1";
    Note.findById.mockResolvedValue(mockNote);

    await noteController.getNoteById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockNote);
  });

  // ❌ GET NOTE NOT FOUND
  it("should return 404 if note not found", async () => {
    req.params.id = "1";
    Note.findById.mockResolvedValue(null);

    await noteController.getNoteById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  // ✅ CREATE NOTE
  it("should create a note", async () => {
    req.body = { title: "New", content: "Note" };

    const saveMock = vi.fn().mockResolvedValue();

    Note.mockImplementation(function () {
        this.save = saveMock;
        return this;
    });

    await noteController.createNote(req, res);

    expect(saveMock).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });

  // ✅ UPDATE NOTE
  it("should update a note", async () => {
    req.params.id = "1";
    req.body = { title: "Updated", content: "Updated content" };

    const updatedNote = { _id: "1", ...req.body };

    Note.findByIdAndUpdate.mockResolvedValue(updatedNote);

    await noteController.updateNote(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedNote);
  });

  // ❌ UPDATE NOT FOUND
  it("should return 404 if update fails", async () => {
    req.params.id = "1";
    Note.findByIdAndUpdate.mockResolvedValue(null);

    await noteController.updateNote(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  // ✅ DELETE NOTE
  it("should delete a note", async () => {
    req.params.id = "1";

    Note.findByIdAndDelete.mockResolvedValue({ _id: "1" });

    await noteController.deleteNote(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  // ❌ DELETE NOT FOUND
  it("should return 404 if delete fails", async () => {
    req.params.id = "1";

    Note.findByIdAndDelete.mockResolvedValue(null);

    await noteController.deleteNote(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

});