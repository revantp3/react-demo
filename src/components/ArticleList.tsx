import { selectFilteredArticles } from '../features/states/slice';
import { useAppSelector } from '../hooks/hooks';
import ArticleCard from './ArticleCard';

const ArticleList = () => {
  // const articles = useSelector((state: RootState) => state.articles.articles);
  const filteredArticles = useAppSelector(selectFilteredArticles);
  console.log(filteredArticles)
  return (
    <div>
      {filteredArticles.map(article => (
        <ArticleCard key={article.title} article={article} />
      ))}
      {/* <Pagination /> */}
    </div>
  );
};

export default ArticleList;
