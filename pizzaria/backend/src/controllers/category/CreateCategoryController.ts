import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController{
    async handle(req: Request, res: Response){
        const { name } = req.body
        const createCategorySerivce = new CreateCategoryService();
        const category = await createCategorySerivce.execute({
            name: name
        });

        return res.json(category);
    }
}

export { CreateCategoryController }