using System.Threading.Tasks;

namespace CrearRemisionTS.Service.Interface
{
    interface ICommand<T>
    {
        Task<T> Execute(IParams param);
    }
}
