class APIFilters {
    constructor (query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name :{
                $regex: this.queryStr.keyword,
                $options: 'i',
            },
        } : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filters() {
        const queryCopy = { ...this.queryStr };
        const fieldsToRemove = ['keyword','page'];
        fieldsToRemove.forEach((el) => delete queryCopy[el]);

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
                       
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
                     
    }
}

export default APIFilters;