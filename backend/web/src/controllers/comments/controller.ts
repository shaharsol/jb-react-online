import { NextFunction, Request, Response } from "express";
import Comment from "../../models/Comment";
import { v4 } from "uuid";
import User from "../../models/User";
import Post from "../../models/Post";

export async function getPerPost(req: Request, res: Response, next: NextFunction) {
    const rawPostId = req.params.postId;
    const postId = Array.isArray(rawPostId) ? rawPostId[0] : rawPostId;
    if (!postId) return next({ status: 400, message: "postId is required" });
    const comments = await Comment.findAll({
        where: {
            postId
        }
    })
    res.json(comments)

}

export async function getOne(req: Request, res: Response, next: NextFunction) {
    const rawId = req.params.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;
    if (!id) return next({ status: 400, message: "comment id is required" });
    const post = await Comment.findByPk(id)
    if (!post) return next ({
        status: 404,
        message: 'comment id not found'
    })
    res.json(post)
}

export async function update(req: Request, res: Response, next: NextFunction) {
    const rawId = req.params.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;
    if (!id) return next({ status: 400, message: "comment id is required" });
    const comment = await Comment.findByPk(id)
    const { body } = req.body;
    comment.body = body;
    await comment.save()
    res.json(comment)
}

export async function create(req: Request, res: Response, next: NextFunction) {
    // const userId = '4b1193cc-7ba1-462c-99c5-2e3ea4ab6d14'
    const userId = req.userId
    const rawPostId = req.params.postId;
    const postId = Array.isArray(rawPostId) ? rawPostId[0] : rawPostId;
    if (!postId) return next({ status: 400, message: "postId is required" });
    const comment = await Comment.create({
        ...req.body,
        id: v4(),
        postId,
        userId,
    })
    await comment.reload({
        include: [User]
    })
    res.json(comment)
}

export async function remove(req: Request, res: Response, next: NextFunction) {
    const rawId = req.params.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;
    if (!id) return next({ status: 400, message: "comment id is required" });
    const post = await Comment.findByPk(id)
    await post.destroy()
    res.json({
        success: true
    })
}

export async function getAll(req: Request, res: Response, next: NextFunction) {
    const comments = await Comment.findAll({
        include: [User, Post]
    })
    res.json(comments)
}
